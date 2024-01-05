const url = 'https://supraoracles.com/blastoff/zh-CN'
const TestUrl = 'https://www.baidu.com'

const browserSettings = [
    {
        userDataDir: '/Users/0yunnzhi/Library/Application Support/Google/Chrome/Profile 3',
    },
    {
        userDataDir: '/Users/0yunnzhi/Library/Application Support/Google/Chrome/Profile 2',
    },
]

const TestBrowserSettings = [
    {
        userDataDir: 'F:\\multi-chrome\\1',
    },
    {
        userDataDir: 'F:\\multi-chrome\\2',
    },
]
//*[@id="su"]
const TestClickActions = [
    // bai du
    {
        path: "//input[@type='submit']", retries: 5
    },
]

const emails =[
    "haidbhwr52@outlook.com",
    "exvqwthv37@outlook.com",
]

function clickActions(mail) {
    return [
        // 1.click Sign-in
        {
            path: '//button[contains(@class, "bg-supraRed") and contains(text(), "Sign In")]', retries: 5
        },
        // 2. input username
        {
            path: "//input[@id='username']", retries: 3, input:`${mail}`
        },
        // 3. input password
        {
            path: "//input[@id='password']", retries: 3, input:"Supra888@"
        },
        // 4. click submit
        {
            path: "//button[@type='submit' and @name='action' and @value='default' and @class='cf4ff3b5d c5faccce1 cfccd0b2a c901653c3 cd1bb01a0' and @data-action-button-primary='true']", retries: 3
        },
        //----------------------------------------------------------------------------------------------------------------
        // 5. click button---Let's GO
        {
            path: '//a[text()="Let\'s Go"]', retries: 3
        },
        // 6. click button---Copy Link
        {
            path: '//button[contains(@class, "bg-supraRed") and contains(text(), "Copy Link")]', retries: 3
        },
        // 7. click button---Continue
        {
            path: '//button[text()="Continue"]', retries: 3
        },
        //----------------------------------------------------------------------------------------------------------------
        // 8. click button---Let's GO
        {
            path: '//a[text()="Let\'s Go"]', retries: 3
        },
        // 9. click button---Enter Now
        {
            path: '//button[contains(@class, "bg-supraRed") and contains(text(), "Enter Now")]', retries: 3
        },
        // 10. click button---Continue
        {
            path: '//button[text()="Continue"]', retries: 3
        },
        //----------------------------------------------------------------------------------------------------------------
        // 11. click button---Start Mission
        {
            path: '//a[text()="Start Mission"]', retries: 3
        },
        // 12. click button---Start Mission
        {
            path: '//button[text()="Start Mission"]', retries: 3
        },
        // 13. click button---Choose D Answer
        {
            path: '//div[contains(@class, "hover:bg-primary") and contains(@class, "cursor-pointer") and contains(@class, "border-darkGray") and contains(@class, "flex") and contains(@class, "items-center") and contains(@class, "space-x-4") and contains(@class, "rounded-md") and contains(@class, "border") and contains(@class, "px-4") and contains(@class, "py-3") and contains(@class, "transition") and contains(@class, "duration-300") and contains(@class, "ease-in-out") and contains(@class, "lg:py-5")]', retries: 3
        },
        // 14. click button---Open Crate
        {
            path: '//button[text()="Open Crate"]', retries: 3
        },
        // 15. click button---Continue Onboarding
        {
            path: '//button[text()="Continue Onboarding"]', retries: 3
        },
        //----------------------------------------------------------------------------------------------------------------
        // 16. click button---Let's GO
        {
            path: '//a[text()="Let\'s Go"]', retries: 3
        },
        // 17. click button---Continue
        {
            path: '//button[text()="Continue"]', retries: 3
        },
        // 18. click button---Continue
        {
            path: '//button[text()="Continue"]', retries: 3
        },
        // 19. click button---User Info
        {
            path: '//img[@alt="user_picture" and @data-testid="next-image"]', retries: 3
        },
        // 20. click button---Log Out
        {
            path: '//button[@id="headlessui-menu-item-:rc:" and contains(@class, "text-supraRed") and contains(@class, "hover:bg-supraRed")]', retries: 3
        },
    ];
}

module.exports = {
    url,
    emails,
    clickActions,
    browserSettings,
    TestUrl,
    TestClickActions,
    TestBrowserSettings
}