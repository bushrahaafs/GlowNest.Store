import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      /* -------- AUTH -------- */
      login: {
        title: "Login",
        email: "Email",
        password: "Password",
        rememberMe: "Remember me",
        submit: "Login",
        noAccount: "Don't have an account?",
        signup: "Sign up",
        emailRequired: "Email is required",
        passwordRequired: "Password is required",
        success: "Login successful!",
        error: "Login failed. Please try again.",
        unexpected: "Unexpected error occurred"
      },
      register: {
        title: "Register",
        name: "Full Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        submit: "Register",
        haveAccount: "Already have an account?",
        login: "Login",
        invalidEmail: "Invalid email address",
        weakPassword: "Password is too weak. Must include letters and numbers.",
        passwordMismatch: "Passwords do not match",
        success: "Registration successful!",
        error: "Registration failed. Please try again.",
        unexpected: "Unexpected error occurred"
      },

      /* -------- DELIVERY & PAYMENT -------- */
      deliveryInfo: "Delivery Information",
      name: "Full Name",
      address: "Address",
      city: "City",
      phone: "Phone Number",
      nameRequired: "Name is required",
      addressRequired: "Address is required",
      cityRequired: "City is required",
      phoneRequired: "Phone number is required",
      next: "Next",
      allFieldsRequired: "Please fill all required fields",
      paymentInfo: "Payment Information",
      paymentMethod: "Payment Method",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      payNow: "Pay Now",
      paymentSuccess: "Payment completed successfully!",
      paymentFailed: "Payment failed. Please try again.",

      /* -------- HOME -------- */
      homePage: {
        heroTitle: "Natural Handmade Soaps",
        heroSubtitle: "Pamper your skin with 100% organic ingredients",
        shopNow: "Shop Now",

        ingredientsTitle: "Pure Ingredients",
        ingredientsText1: "Our soaps are crafted with natural oils and herbs.",
        ingredientsText2: "No harsh chemicals. Just goodness for your skin.",

        benefitsTitle: "Why You'll Love Them",
        benefit1Title: "Deeply Nourishing",
        benefit1Text: "Rich vitamins that feed your skin.",
        benefit2Title: "Intense Hydration",
        benefit2Text: "Leaves skin soft and supple all day.",
        benefit3Title: "Non-Greasy Feel",
        benefit3Text: "Light formula absorbs quickly.",

        reviewsTitle: "Customer Reviews",
        review1: "The soap smells amazing and leaves my skin so soft!",
        review2: "Finally found a product my sensitive skin loves.",

        categoriesTitle: "Shop by Category"
      },

      /* -------- CATEGORIES -------- */
      categories: {
        soap: "Soaps",
        serum: "Serums",
        oil: "Oils",
        lip: "Lip Care"
      },

      /* -------- NAVBAR -------- */
      home: "Home",
      soaps: "Soaps",
      serums: "Serums",
      oils: "Oils",
      lipCare: "Lip Care",
      search: "Search...",
      profile: "Profile",
      logout: "Logout",

      /* -------- PRODUCT CARD -------- */
      addedToCart: "Added to cart!",
      addedToFavorites: "Added to favorites!",
      removedFromFavorites: "Removed from favorites!",
      alreadyInFavorites: "Product already in favorites",

      /* -------- CART PAGE -------- */
      cart: {
        title: "Your Cart",
        empty: "Your cart is empty.",
        continueShopping: "Continue Shopping",
        quantity: "Quantity",
        summary: "Order Summary",
        total: "Total",
        checkout: "Checkout"
      },
      removedFromCart: "Product removed from cart!",
      price: "Price",

      /* -------- FAVORITES PAGE -------- */
      favorites: {
        title: "Favorites",
        empty: "Your favorites list is empty.",
        backHome: "Back to Home",
        remove: "Remove"
      },

      /* -------- PROFILE PAGE -------- */
      profilePage: {
        greeting: "Welcome,",
        myOrders: "My Orders",
        noOrders: "You have no orders yet.",
        loadFailed: "Failed to load orders"
      },

      /* -------- PRODUCT DETAILS -------- */
      product: {
        notFound: "Product not found."
      },
      category: "Category",
      description: "Description",
      noDescription: "No description available.",

      /* -------- ORDER CONFIRMATION -------- */
      order: {
        success: "🎉 Your order has been placed successfully",
        number: "Order Number:",
        backHome: "Back to Home"
      },
      /* ==== EN ==== */

discountBanner: {
  title: "Welcome to GlowNest – Natural skin care you can trust"
},
/* ============= EN ============= */
products: {
  naturalSoap      : "Natural Soap",
  naturalSoapDesc  : "A gentle, natural soap made from organic ingredients.",
  herbalSoap       : "Herbal Soap",
  herbalSoapDesc   : "Herbal soap with calming properties.",
  vitaminCSerum    : "Vitamin C Serum",
  vitaminCSerumDesc: "Brightens skin and reduces pigmentation.",
  hydratingSerum   : "Hydrating Serum",
  hydratingSerumDesc: "Deeply hydrating serum for dry skin.",
  organicLipOil    : "Organic Lip Oil",
  organicLipOilDesc: "Nourishing lip oil made with organic ingredients.",
  glossyLipOil     : "Glossy Lip Oil",
  glossyLipOilDesc : "Provides glossy, hydrated lips all day long.",
  arganOil         : "Argan Oil",
  arganOilDesc     : "Pure Moroccan argan oil for skin and hair.",
  rosehipOil       : "Rosehip Oil",
  rosehipOilDesc   : "Rich in essential fatty acids and antioxidants.",
  honeySoap        : "Honey Soap",
  honeySoapDesc    : "Soap enriched with honey and oats.",
  charcoalSoap     : "Charcoal Soap",
  charcoalSoapDesc : "Detoxifying charcoal soap for oily skin.",
  glowSerum        : "Glow Serum",
  glowSerumDesc    : "Gives skin a radiant glow.",
  antiAgingSerum   : "Anti-Aging Serum",
  antiAgingSerumDesc: "Reduces wrinkles and fine lines.",
  mintLipOil       : "Mint Lip Oil",
  mintLipOilDesc   : "Cooling minty lip oil.",
  tintedLipOil     : "Tinted Lip Oil",
  tintedLipOilDesc : "Adds color and moisture.",
  lavenderOil      : "Lavender Oil",
  lavenderOilDesc  : "Relaxing lavender essential oil.",
  coconutOil       : "Coconut Oil",
  coconutOilDesc   : "Multi-use coconut oil."
},
    }
  },

  ar: {
    translation: {
      /* -------- AUTH -------- */
      login: {
        title: "تسجيل الدخول",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        rememberMe: "تذكرني",
        submit: "دخول",
        noAccount: "ليس لديك حساب؟",
        signup: "إنشاء حساب",
        emailRequired: "البريد الإلكتروني مطلوب",
        passwordRequired: "كلمة المرور مطلوبة",
        success: "تم تسجيل الدخول بنجاح!",
        error: "فشل تسجيل الدخول. حاول مرة أخرى.",
        unexpected: "حدث خطأ غير متوقع"
      },
      register: {
        title: "إنشاء حساب",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        submit: "سجل",
        haveAccount: "هل لديك حساب؟",
        login: "تسجيل الدخول",
        invalidEmail: "البريد الإلكتروني غير صالح",
        weakPassword: "كلمة المرور ضعيفة. يجب أن تحتوي على أحرف وأرقام.",
        passwordMismatch: "كلمتا المرور غير متطابقتين",
        success: "تم التسجيل بنجاح!",
        error: "فشل التسجيل. حاول مرة أخرى.",
        unexpected: "حدث خطأ غير متوقع"
      },

      /* -------- DELIVERY & PAYMENT -------- */
      deliveryInfo: "معلومات التوصيل",
      name: "الاسم الكامل",
      address: "العنوان",
      city: "المدينة",
      phone: "رقم الجوال",
      nameRequired: "الاسم مطلوب",
      addressRequired: "العنوان مطلوب",
      cityRequired: "المدينة مطلوبة",
      phoneRequired: "رقم الجوال مطلوب",
      next: "التالي",
      allFieldsRequired: "يرجى تعبئة جميع الحقول",
      paymentInfo: "معلومات الدفع",
      paymentMethod: "طريقة الدفع",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء",
      cvv: "CVV",
      payNow: "ادفع الآن",
      paymentSuccess: "تمت عملية الدفع بنجاح!",
      paymentFailed: "فشلت عملية الدفع. حاول مرة أخرى.",

      /* -------- HOME -------- */
      homePage: {
        heroTitle: "صابون طبيعي يدوي الصنع",
        heroSubtitle: "دلل بشرتك بمكونات عضوية 100٪",
        shopNow: "تسوق الآن",

        ingredientsTitle: "مكونات نقية",
        ingredientsText1: "صابوننا مصنوع من زيوت وأعشاب طبيعية.",
        ingredientsText2: "بدون مواد كيميائية قاسية – فقط فوائد لبشرتك.",

        benefitsTitle: "لماذا ستحبه؟",
        benefit1Title: "تغذية عميقة",
        benefit1Text: "فيتامينات غنية تغذي بشرتك.",
        benefit2Title: "ترطيب مكثف",
        benefit2Text: "يترك البشرة ناعمة طوال اليوم.",
        benefit3Title: "غير دهني",
        benefit3Text: "تركيبة خفيفة تمتص بسرعة.",

        reviewsTitle: "آراء العملاء",
        review1: "رائحة رائعة وتجعل بشرتي ناعمة جداً!",
        review2: "أخيراً وجدت منتجاً يناسب بشرتي الحساسة.",

        categoriesTitle: "تسوق حسب الفئة"
      },

      /* -------- CATEGORIES -------- */
      categories: {
        soap: "الصابون",
        serum: "السيروم",
        oil: "الزيوت",
        lip: "العناية بالشفاه"
      },

      /* -------- NAVBAR -------- */
      home: "الرئيسية",
      soaps: "الصابون",
      serums: "السيروم",
      oils: "الزيوت",
      lipCare: "العناية بالشفاه",
      search: "بحث...",
      profile: "الملف الشخصي",
      logout: "تسجيل خروج",

      /* -------- PRODUCT CARD -------- */
      addedToCart: "تمت الإضافة للسلة!",
      addedToFavorites: "تمت الإضافة للمفضلة!",
      removedFromFavorites: "تمت الإزالة من المفضلة!",
      alreadyInFavorites: "المنتج موجود بالفعل في المفضلة",

      /* -------- CART PAGE -------- */
      cart: {
        title: "سلة التسوق",
        empty: "سلة التسوق فارغة.",
        continueShopping: "متابعة التسوق",
        quantity: "الكمية",
        summary: "ملخص الطلب",
        total: "الإجمالي",
        checkout: "إتمام الشراء"
      },
      removedFromCart: "تمت إزالة المنتج من السلة!",
      price: "السعر",

      /* -------- FAVORITES PAGE -------- */
      favorites: {
        title: "المفضلة",
        empty: "قائمة المفضلة فارغة.",
        backHome: "العودة للرئيسية",
        remove: "إزالة"
      },

      /* -------- PROFILE PAGE -------- */
      profilePage: {
        greeting: "مرحباً،",
        myOrders: "طلباتي",
        noOrders: "لا توجد طلبات حتى الآن.",
        loadFailed: "فشل تحميل الطلبات"
      },

      /* -------- PRODUCT DETAILS -------- */
      product: {
        notFound: "المنتج غير موجود."
      },
      category: "الفئة",
      description: "الوصف",
      noDescription: "لا يوجد وصف متاح.",

      /* -------- ORDER CONFIRMATION -------- */
      order: {
        success: "🎉 تم إرسال طلبك بنجاح",
        number: "رقم الطلب:",
        backHome: "العودة للرئيسية"
      },
      /* ==== AR ==== */

discountBanner: {
  title: "مرحبًا بكم في GlowNest – عناية طبيعية لبشرتك يمكنك الوثوق بها"
},

/* ============= AR ============= */
products: {
  naturalSoap      : "صابون طبيعي",
  naturalSoapDesc  : "صابون لطيف طبيعي مصنوع من مكونات عضوية.",
  herbalSoap       : "صابون عشبي",
  herbalSoapDesc   : "صابون عشبي ذو خصائص مهدئة.",
  vitaminCSerum    : "سيروم فيتامين سي",
  vitaminCSerumDesc: "يضيء البشرة ويقلل التصبغات.",
  hydratingSerum   : "سيروم مرطب",
  hydratingSerumDesc: "سيروم ترطيب عميق للبشرة الجافة.",
  organicLipOil    : "زيت شفاه عضوي",
  organicLipOilDesc: "زيت شفاه مغذٍ بمكونات عضوية.",
  glossyLipOil     : "زيت شفاه لامع",
  glossyLipOilDesc : "يمنح شفاه لامعة ورطوبة طوال اليوم.",
  arganOil         : "زيت الأرجان",
  arganOilDesc     : "زيت أرجان مغربي نقي للبشرة والشعر.",
  rosehipOil       : "زيت ثمر الورد",
  rosehipOilDesc   : "غني بالأحماض الدهنية ومضادات الأكسدة.",
  honeySoap        : "صابون العسل",
  honeySoapDesc    : "صابون بالعسل والشوفان.",
  charcoalSoap     : "صابون الفحم",
  charcoalSoapDesc : "صابون فحم منظف للبشرة الدهنية.",
  glowSerum        : "سيروم التوهج",
  glowSerumDesc    : "يمنح البشرة إشراقة صحية.",
  antiAgingSerum   : "سيروم مضاد للشيخوخة",
  antiAgingSerumDesc: "يقلل التجاعيد والخطوط الرفيعة.",
  mintLipOil       : "زيت شفاه بالنعناع",
  mintLipOilDesc   : "زيت شفاه منعش بنكهة النعناع.",
  tintedLipOil     : "زيت شفاه ملون",
  tintedLipOilDesc : "يضيف لوناً ورطوبة.",
  lavenderOil      : "زيت اللافندر",
  lavenderOilDesc  : "زيت اللافندر العطري للاسترخاء.",
  coconutOil       : "زيت جوز الهند",
  coconutOilDesc   : "زيت جوز الهند متعدد الاستخدامات."
},

    }
  }
};

i18n
  .use(LanguageDetector)        // ⬅️ قبل init
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',          // أبقِها احتياطًا
    detection: {
      order : ['localStorage', 'navigator'],
      caches: ['localStorage']  // يخزِّن تلقائيًا في localStorage
    },
    interpolation: { escapeValue: false }
  });

export default i18n;









