


export const pageElements = {
    HomePage: {
        // Page URL
        url: "https://automationexercise.com/",
    
        // Main page elements
        loginButtonSelector: "a[href='/login']",
        loggedInAsButton: "//a[contains(text(),'Logged in as')]",
        accountDeleteButton: "a[href='/delete_account']",
        productButton: "a[href='/products']",
        cartButton: "a[href='/view_cart']",
        logoutButton: "a[href='/logout']",
    
        // Footer elements
        footerSection: "#footer",
        subscriptionLabel: ".single-widget h2",
        subscriberEmailField: "#susbscribe_email",
        subscribeEmailSubmitButton: "#subscribe",
        subscribeSuccessMessage: "#success-subscribe",
    
        // Specific content elements
        fullFledgedText: "heading:has-text('Full-Fledged practice')",
    },
        LoginPage : {

        // Login Form Field 
            url:"https://automationexercise.com/login",
            sectionHeader:".login-form h2",
            EmailField:"input[data-qa='login-email']",
            PasswordField:"input[data-qa='login-password']",
            loginButton:"button[data-qa='login-button']",

            //After Login  ----------------------------
            loggedInAsButton:"//a[contains(text(),'Logged in as')]",

              //Error Message  ----------------------------
            errorMessage:".login-form",
            EXPECTED_ERROR_MESSAGE:"Your email or password is incorrect!",

            //Constants
            EXPECTED_SECTION_HEADER :"Login to your account",

    },

    SignUP:{
        url:"https://automationexercise.com/login",
        SignUpSectionHeader : "div[class='signup-form'] h2",
        //SignUp
        NameField : "input[placeholder='Name']",
        SignUpEmailField : "input[data-qa='signup-email']",
        SignUpButton : "button[data-qa='signup-button']",
        EXPECTED_SECTION_HEADER :"New User Signup!",

        Account_information_text:".login-form h2 b",
        EXPECTED_ACCOUNT_INFORMATION_TEXT:"Enter Account Information",

    },

    AccountInformation:{
        accountInformationUrl: "https://automationexercise.com/signup",
        EnterAccountInformation: ".login-form h2 b",
        
        //Title ----------------------------
        MrRadioButton: "input[value='Mr']",
        MrsRadioButton: "input[value='Mrs']",
        //Title End--------------------------------
        NameField: "#name",
        EmailField: "#email",
        PasswordField: "#password",
         //Dob-----------------------------
        days: "#days",
        months: "#months",
        years: "#years",
        //Dob End--------------------------------
        NewsletterCheckBox: "#newsletter",
        SpecialOffersCheckBox: "#optin",
        FirstNameField: "#first_name",
        LastNameField: "#last_name",
        CompanyField: "#company",
        AddressField: "#address1",
        Address2Field: "#address2",
        CountryField: "#country",
        StateField: "#state",
        CityField: "#city",
        ZipcodeField: "#zipcode",
        MobileNumberField: "#mobile_number",
        CreateAccountButton: "button[data-qa='create-account']",
        EXPECTED_ACCOUNT_INFORMATION_TEXT: "Enter Account Information"

    },

    AccountCreatedPage :{

        // Account Created Page Elements
        url: "https://automationexercise.com/account_created",
        sectionHeader: "h2 b", // Account Created label
        
        // Buttons
        ContinueButton: ".btn.btn-primary",
    
        // Constants
        EXPECTED_SECTION_HEADER: "Account Created!",
    
    },

    ProductPage : {
        // Page URL
        url: "https://automationexercise.com/products",
    
        // Main product page elements
        allProductTextLabel: ".title",
        searchBarInput: "#search_product",
        searchButton: "#submit_search",
        productCard: ".col-sm-4 .single-products",
    
        // Searched product elements
        searchedProductPageLabel: ".title",
        searchedProductCard: ".col-sm-4 .single-products",
    
        // Modal elements
        modalPopupAddToCartButton: ".modal-body a",
        modalContinueShoppingButton: ".close-modal"
    },
}