// Package mailer provides a thin wrapper around net/smtp for sending transactional emails.
// No third-party dependencies are required.
package mailer

import (
	"crypto/tls"
	"fmt"
	"net"
	"net/smtp"
)

// Config holds SMTP connection details loaded from environment variables.
type Config struct {
	Host     string
	Port     string
	Username string
	Password string
	From     string
}

// Mailer is the interface used by services that need to send email.
type Mailer interface {
	SendPasswordReset(toEmail, toName, resetURL string) error
}

type smtpMailer struct {
	cfg Config
}

// New returns a Mailer backed by the provided SMTP configuration.
func New(cfg Config) Mailer {
	return &smtpMailer{cfg: cfg}
}

// SendPasswordReset sends a password-reset email to the given recipient.
func (m *smtpMailer) SendPasswordReset(toEmail, toName, resetURL string) error {
	addr := fmt.Sprintf("%s:%s", m.cfg.Host, m.cfg.Port)

	subject := "Reset your Propnest password"
	body := fmt.Sprintf(`Hi %s,

We received a request to reset your Propnest account password.

Click the link below to choose a new password (valid for 1 hour):

  %s

If you did not request a password reset, you can safely ignore this email.

— The Propnest Team
`, toName, resetURL)

	msg := []byte(
		"From: " + m.cfg.From + "\r\n" +
			"To: " + toEmail + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"MIME-Version: 1.0\r\n" +
			"Content-Type: text/plain; charset=\"utf-8\"\r\n" +
			"\r\n" +
			body,
	)

	conn, err := net.Dial("tcp", addr)
	if err != nil {
		return fmt.Errorf("smtp dial: %w", err)
	}

	c, err := smtp.NewClient(conn, m.cfg.Host)
	if err != nil {
		return fmt.Errorf("smtp new client: %w", err)
	}
	defer c.Close()

	// Only attempt STARTTLS if the server advertises it
	if ok, _ := c.Extension("STARTTLS"); ok {
		tlsCfg := &tls.Config{
			InsecureSkipVerify: true, //nolint:gosec // dev SMTP; set to false with a valid cert in production
			ServerName:         m.cfg.Host,
		}
		if err := c.StartTLS(tlsCfg); err != nil {
			return fmt.Errorf("smtp STARTTLS: %w", err)
		}
	}

	// Only authenticate if credentials are provided AND server advertises AUTH
	if m.cfg.Username != "" {
		if ok, _ := c.Extension("AUTH"); ok {
			auth := smtp.PlainAuth("", m.cfg.Username, m.cfg.Password, m.cfg.Host)
			if err := c.Auth(auth); err != nil {
				return fmt.Errorf("smtp auth: %w", err)
			}
		}
	}

	if err := c.Mail(m.cfg.From); err != nil {
		return fmt.Errorf("smtp MAIL FROM: %w", err)
	}
	if err := c.Rcpt(toEmail); err != nil {
		return fmt.Errorf("smtp RCPT TO: %w", err)
	}

	wc, err := c.Data()
	if err != nil {
		return fmt.Errorf("smtp DATA: %w", err)
	}
	if _, err := wc.Write(msg); err != nil {
		return fmt.Errorf("smtp write body: %w", err)
	}
	return wc.Close()
}
