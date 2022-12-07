DROP DATABASE IF EXISTS `blog`;
CREATE DATABASE `blog`;
USE `blog`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(45) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `img` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5;
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `desc` longtext NOT NULL,
    `img` varchar(255) NOT NULL,
    `cat` varchar(255) NOT NULL,
    `date` datetime NOT NULL,
    `uid` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FK_USER_ID FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE = InnoDB;
INSERT INTO `users` (`username`, `email`, `password`)
VALUES (
        'Sandeep',
        'sandeep@gmail.com',
        '$2a$10$vnwsrgdcXEYYZDWEmkOWZ.gU90FO/uky5eBwSS6DkS0qToVideyl.'
    ),
    (
        'Karamjeet',
        'karamjeet@gmail.com',
        '$2a$10$Ds7Q//jM5y6jGy3/y82ot.zOFAN6B6tFXjXpc8RGoZXqDHcmufdXS'
    );
INSERT INTO `posts` (`title`, `desc`, `img`, `cat`, `date`, `uid`)
VALUES (
        'Computer Science Students Face a Shrinking Big Tech Job Market',
        '<p>Ever since she was a 10th grader in Seattle, Annalice Ni wanted to develop software for a prominent tech company like Google. So she went to great lengths to meet the internship and other rsum criteria that make students attractive hires to the biggest tech firms.</p><p>In high school, Ms. Ni took computer science courses, interned at Microsoft and volunteered as a coding teacher for younger students.&nbsp;<a href="https://www.linkedin.com/in/annaliceni" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">She majored in computer science</a>&nbsp;at the University of Washington, earning coveted software engineering internships at Facebook. After graduating from college this year, she moved to Silicon Valley to start her dream job as a software engineer at Meta, Facebooks parent company.</p>',
        '1670392066063tech1.webp',
        'technology',
        '2022-12-06 21:47:46',
        5
    ),
    (
        'The Brilliance and Weirdness of ChatGPT',
        '<p>Like most nerds who read science fiction, Ive spent a lot of time wondering how society will greet true artificial intelligence, if and when it arrives. Will we panic? Start sucking up to our new robot overlords? Ignore it and go about our daily lives?</p><p>So its been fascinating to watch the Twittersphere try to make sense of ChatGPT, a new cutting-edge A.I. chatbot that was opened for testing last week.</p><p>ChatGPT is, quite simply, the best artificial intelligence chatbot ever released to the general public. It was built by OpenAI, the San Francisco A.I. company that is also responsible for tools like GPT-3 and&nbsp;<a href="https://www.nytimes.com/2022/04/06/technology/openai-images-dall-e.html" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">DALL-E 2</a>, the breakthrough image generator that came out this year.</p><p>Like those tools, ChatGPT  which stands for generative pre-trained transformer  landed with a splash. In five days,&nbsp;<a href="https://twitter.com/gdb/status/1599683104142430208" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">more than a million people</a>&nbsp;signed up to test it, according to Greg Brockman, OpenAIs president. Hundreds of screenshots of ChatGPT conversations went viral on Twitter, and many of its early fans speak of it in astonished, grandiose terms, as if it were some mix of software and sorcery.</p><p><br></p>',
        '1670392258007tech2.webp',
        'technology',
        '2022-12-06 21:50:58',
        5
    ),
    (
        'Two Women Sue Apple Over AirTag Stalking',
        '<p>Two women sued Apple on Monday over the dangers of its AirTag tracking devices in the hands of stalkers, saying the company had failed to heed warnings from advocacy groups and news reports.</p><p>The proposed class action lawsuit was filed on Monday in the United States District Court for the Northern District of California and accuses Apple of failing to introduce effective safeguards that would prevent stalkers from using AirTags to track people. The women said the devices had been used by their former partners to track them.</p><p>Apple introduced AirTags, which cost $29 and are about the size of a quarter, last year as a device that could be used to track personal items like keys and wallets. Other devices pick up their Bluetooth signals; some iPhone users get alerts if a nearby AirTag is moving alongside them. Advocates for survivors of domestic violence warned early on that stalkers could take advantage of the trackers.</p><p>With a price point of just $29, it has become the weapon of choice of stalkers and abusers, the lawsuit said.</p><p>Apple did not immediately respond to a request for comment. The company&nbsp;<a href="https://www.nytimes.com/2022/02/10/business/apple-airtags-safety.html" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">made changes to the products</a>&nbsp;early this year after complaints, saying, We condemn in the strongest possible terms any malicious use of our products.</p><p><br></p>',
        '1670397303258bus1.webp',
        'business',
        '2022-12-06 23:15:03',
        5
    ),
    (
        'Ordinary Investors Who Jumped Into Crypto Are Saying: Now What?',
        '<p>In early November, Adrian Butkus, a 43-year-old father of two, put $600,000  much of his life savings  into an account at BlockFi, a cryptocurrency trading firm. BlockFi had marketed the account as risk free, yielding 6.5 percent interest, more than Mr. Butkus could get anywhere else.</p><p>Just days later, as the collapse of the cryptocurrency exchange FTX shook the entire crypto industry, Mr. Butkus asked BlockFi for his money back. But the firm had suspended customer withdrawals, citing&nbsp;<a href="https://www.nytimes.com/2022/11/28/business/blockfi-bankruptcy-cryptocurrency-ftx.html" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">its close financial ties to FTX</a>. By late November, BlockFi, too, had filed for bankruptcy.</p><p>Mr. Butkus doesnt know when  or if  he will see his money again. He is one of millions of individual investors around the world who poured money into digital assets, believing the cryptocurrency industry was a stable financial system. They were cleareyed about the volatility and big price swings of Bitcoin and other cryptocurrencies. But what has come as a big surprise to many is that the firms where they deposited their money lacked the basic protections offered by a brokerage or a bank.</p><p>As companies like FTX took on the marketing tactics and girth of mainstream financial firms, their customers came to believe they were safe places to deposit cash in exchange for cryptocurrency. The fact that big-name venture capital and other funds backed some of these companies only added to their allure.</p><p>It just angers me, Mr. Butkus said. Now Im in a fight to get back some of my money.</p><p>Cryptocurrency firms, led by FTX, exploded into the mainstream in the past couple of years, pitching their products in extensive advertising campaigns as stable and safe investments. Unlike traditional banks and brokerages, which are limited in what they can say, the crypto firms arent subject to the same rules.</p><p><br></p>',
        '1670397380718bus2.webp',
        'business',
        '2022-12-06 23:16:20',
        5
    ),
    (
        'The Best Gifts for the People Who Love to Cook',
        '<p>When it comes to holiday shopping, its hard to go wrong with a gift for the home cook. Whether its a new cookbook, a set of kitchen tools or a piece of cookware, the right gift can make a big difference in the kitchen.</p><p>But with so many options, its hard to know where to start. To help, we asked a few of our favorite food writers and chefs to share their favorite gifts for the home cook. Here are their picks.</p><p><br></p>',
        '1670352937057des2.jpeg',
        'business',
        '2022-12-06 23:16:30',
        6
    ),
    (
        'Are You Applying for Tech Jobs or Internships? We Want to Hear About It.',
        '<p>November was a bleak month for tech workers.&nbsp;<a href="https://www.nytimes.com/2022/11/09/technology/meta-layoffs-facebook.html" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">Meta</a>, Amazon, Lyft, Stripe and Twitter laid off thousands of employees.&nbsp;<a href="https://www.nytimes.com/2022/11/03/technology/tech-companies-hiring-freeze-job-cuts.html" rel="noopener noreferrer" target="_blank" style="color: var(--color-signal-editorial,#326891);">Microsoft and Google</a>&nbsp;announced hiring slowdowns.</p><p>The cutbacks and hiring freezes affected not only veteran employees. Some tech companies laid off recent college graduates or rescinded their job offers. Some firms are also cutting their summer internship programs for college students next year.</p><p>The industry slowdown is sending shock waves through a generation of computer science and data science students who spent years preparing themselves for careers at the largest tech companies. Many recent grads and college seniors are now seeking tech jobs outside the tech industry, in industries like retail, banking and finance.</p><p>Im a technology reporter at The New York Times who investigates the societal impacts of tech innovations and tech company business practices. And I am reporting a story about the implications of the industry jobs slowdown for people in the early stages of their tech careers.</p><p>If you are a college student or recent grad applying for tech internships or jobs, Id like to hear from you.</p><p><span style="background-color: rgb(255, 255, 255); color: rgb(54, 54, 54);">We may use your contact information to follow up with you. If we publish your submission, we will not include your name without first contacting you and obtaining your permission.</span></p>',
        '1670397474676tech3.webp',
        'technology',
        '2022-12-06 23:17:54',
        6
    );