export default {
  Nav: {
    listings: 'ዝርዝሮች',
    agents: 'ወኪሎች',
    about: 'ስለ እኛ',
    signIn: 'ግባ',
    getStarted: 'ጀምር',
  },
  Auth: {
    Login: {
      title: 'ወደ መለያዎ ይግቡ',
      subtitle: 'ወይም',
      noAccount: 'የ14 ቀን ነፃ ሙከራ ይጀምሩ',
      email: 'የኢሜል አድራሻ',
      password: 'የይለፍ ቃል',
      remember: 'አስታውሰኝ',
      forgot: 'የይለፍ ቃል ረስተዋል?',
      submit: 'ግባ',
      continueWith: 'ወይም በነዚህ ይቀጥሉ',
      registeredSuccess: 'ምዝገባ በትክክል ተጠናቋል! እባክዎን በአዲስ መለያዎ ይግቡ።',
    },
    Register: {
      title: 'መለያ ይፍጠሩ',
      subtitle: 'ቀድሞውኑ መለያ አለዎት?',
      hasAccount: 'ግባ',
      name: 'ሙሉ ስም',
      email: 'የኢሜል አድራሻ',
      password: 'የይለፍ ቃል',
      confirmPassword: 'የይለፍ ቃል ያረጋግጡ',
      submit: 'መለያ ፍጠር',
      roles: {
        buyer: 'መግዛት እፈልጋለሁ',
        seller: 'መሸጥ እፈልጋለሁ',
        realtor: 'እኔ ወኪል (Realtor) ነኝ',
      },
    },
  },
  Hero: {
    badge: 'የሪል እስቴት የወደፊቱ',
    headline1: 'በእውነት ቤት የሚሰሙበትን',
    headline2: 'ቦታ ያግኙ',
    description:
      'ፕሮፕነስት ዘመናዊ ማዛመጃ እና የተረጋገጡ ዝርዝሮችን ተጠቅሞ ምርጥ ቤትዎን ያለ ችግር እና ደህንነቱ ተጠብቆ እንዲያካ ይረዳዎታል።',
    searchPlaceholder: 'በከተማ፣ ሰፈር፣ ወይም ፖስታ ኮድ ይፈልጉ',
    searchButton: 'ፈልግ',
  },
  FeaturedListings: {
    title: 'ተለይተው የቀረቡ ዝርዝሮች',
    subtitle: 'ከዓለም ዙሪያ የተለያዩ ምርጥ ቤቶችን ያስሱ።',
    viewAll: 'ሁሉንም ይመልከቱ',
  },
  WhyUs: {
    title: 'ለምን ፕሮፕነስት?',
    subtitle:
      'የሪል እስቴት ጉዞን ሙሉ ለሙሉ ቀላል አድርገን ዲዛይን ሰርተናል፤ ኃይሉን እና ግልጽነቱን ወደ እርስዎ እጅ አምጥተናል።',
    verified: 'የተረጋገጡ ዝርዝሮች',
    verifiedDesc: 'እያንዳንዱ ቤት 100% ትክክለኛነትን ለማረጋገጥ ጥብቅ ምርምር ያልፋል።',
    smart: 'ዘመናዊ ማዛመጃ',
    smartDesc: 'AI ምርጫዎን ይተነትናል እና እርስዎ የሚወዷቸውን ቤቶች ያሳያዎታል።',
    insights: 'የገበያ ትንታኔ',
    insightsDesc: 'በሰፈር የዋጋ አዝማሚያዎች ላይ ቅጽበታዊ ውሂብ በመጠቀም ጠቃሚ ውሳኔ ያድርጉ።',
  },
  CTA: {
    title: 'ቤትዎን ለማግኘት ዝግጁ ነዎት?',
    subtitle: 'ህልማቸውን ቤት ባገኙ ሺዎች ሰዎች ይቀላቀሉ።',
    button: 'ነፃ መለያ ይፍጠሩ',
  },
  PropertyCard: {
    beds: 'መኝታ ክፍሎች',
    baths: 'መታጠቢያ ክፍሎች',
    sqft: 'ካ.ሜ',
  },
  Dashboard: {
    Sidebar: {
      overview: 'አጠቃላይ እይታ',
      search: 'ቤቶችን ፈልግ',
      saved: 'የተቀመጡ',
      messages: 'መልዕክቶች',
      settings: 'ቅንብሮች',
      signOut: 'ውጣ',
    },
    Buyer: {
      welcome: 'እንኳን ደህና መጡ፣',
      subtitle: 'ዛሬ በእርስዎ የቤት ፍለጋ ውስጥ ምን እየተከናወነ እንዳለ እነሆ።',
      stats: {
        viewed: 'የታዩ ቤቶች',
        saved: 'የተቀመጡ ዝርዝሮች',
        inquiries: 'ንቁ ጥያቄዎች',
      },
      recent: {
        title: 'በቅርቡ የታዩ',
        subtitle: 'በቅርብ ጊዜ የተመለከቷቸው ቤቶች',
      },
      ai: {
        title: 'AI ምክሮች',
        subtitle: 'በእርስዎ ምርጫ እና የፍለጋ ታሪክ ላይ በመመስረት',
      },
    },
  },
} as const;
