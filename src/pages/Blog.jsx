import PageLayout from '../components/PageLayout';

const Blog = () => {
    const posts = [
        {
            title: '1. Difference between javascript and nodejs',
            category: { name: 'Article' },
            description:
                'JavaScript is a high-level, interpreted programming language. We can run any JavaScript code inside a browser. It is used to create interactive web apps. It is also used to create programs for servers. On the other hand, NodeJS is a JavaScript interpretor and a runtime environment for JavaScript programs. It is used to create server-side JavaScript apps and many more. We can use NodeJS to run code written in JavaScript without browsers.',
            date: 'May 4, 2022',
            datetime: '2022-05-22',
            imageUrl:
                'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
            readingTime: '2 min',
            author: {
                name: 'Jaied Al Sabid',
                href: 'https://www.linkedin.com/in/jaiedsabid/',
                imageUrl: '/images/admin-avatar.jfif',
            },
        },
        {
            title: '2. When should you use nodejs and when should you use mongodb?',
            category: { name: 'Article' },
            description:
                'NodeJS is a JavaScript interpretor and a runtime environment for JavaScript programs. It is used to create server-side JavaScript apps, also to develop other type of apps written in JavaScript. We can use NodeJS to run code written in JavaScript without browsers. On the other hand, MongoDB is a NoSQL database. We can use MongoDB to store our data. It provides an API library that runs within a Nodejs application to give you programmatic access to MongoDB so we can create databases and then add, query, update or delete data from the MongoDB database. So if we want build a server-side app using JavaScript we can use NodeJS and if we want to store data in a NoSQL database we can use MongoDB.',
            date: 'May 4, 2022',
            datetime: '2022-05-22',
            imageUrl:
                'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
            readingTime: '5 min',
            author: {
                name: 'Jaied Al Sabid',
                href: 'https://www.linkedin.com/in/jaiedsabid/',
                imageUrl: '/images/admin-avatar.jfif',
            },
        },
        {
            title: '3. What is the purpose of jwt and how does it work?',
            category: { name: 'Article' },
            description:
                "JWT is the short form of JSON Web Token. It is a standard format for representing claims to be transferred between parties (a client and a server) in a secure way. It is used to authenticate users and authorize access to resources. Each JWT contains encoded JSON objects including claims about the subject of the token. The claims are used to determine if the token is valid and what the token represents. The token is signed using a secret key and a cryptographic algorithm to ensure that the token can't be decoded without the secret key.",
            date: 'May 4, 2022',
            datetime: '2022-05-22',
            imageUrl:
                'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
            readingTime: '3 min',
            author: {
                name: 'Jaied Al Sabid',
                href: 'https://www.linkedin.com/in/jaiedsabid/',
                imageUrl: '/images/admin-avatar.jfif',
            },
        },
    ];

    return (
        <PageLayout>
            <div className="relative bg-gray-50 pt-10 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3" />
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                            Latest Posts
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Here are some of our latest posts. You can read more
                            about our latest products and activity on our blog
                            section.
                        </p>
                    </div>
                    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                        {posts.map((post) => (
                            <div
                                key={post.title}
                                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover"
                                        src={post.imageUrl}
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-indigo-600">
                                            <span>{post.category.name}</span>
                                        </p>
                                        <div className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">
                                                {post.title}
                                            </p>
                                            <p className="mt-3 text-base text-gray-500">
                                                {post.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <a
                                                href={post.author.href}
                                                target="_blank"
                                            >
                                                <span className="sr-only">
                                                    {post.author.name}
                                                </span>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={post.author.imageUrl}
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                <a
                                                    href={post.author.href}
                                                    target="_blank"
                                                    className="hover:underline"
                                                >
                                                    {post.author.name}
                                                </a>
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time dateTime={post.datetime}>
                                                    {post.date}
                                                </time>
                                                <span aria-hidden="true">
                                                    &middot;
                                                </span>
                                                <span>
                                                    {post.readingTime} read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Blog;
