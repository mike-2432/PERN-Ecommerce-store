export const links = [
    {
        id: 1,
        url: '/',
        name: 'Home',
    },
    {
        id: 2,
        url: '/products',
        name: 'Products',
    }
]


export const info = [
    <>The goal was to use as little dependencies as possible. For the <span className="highlight">front-end</span>, only React is being used as a javascript libarary. For the <span className="highlight">back-end</span>, NodeJS, Express and Pg are being used. Pg is a non-blocking PostgreSQL client for NodeJS and is used to interact with the <span className="highlight">PostgreSQL database</span>.</>,
    <>As for the <span className="highlight">functionalities</span>, you can <span className='highlight'>search</span> products by name, sort by category or filter by price or name. The last two can be combined. The application also has a <span className='highlight'>cart</span> functionality that interacts with the <span className='highlight'>inventory</span>. Whenever a new item is added to the cart, the inventory in the database is checked on the <span className='highlight'>client-side</span> to see if there is enough inventory. This is done again on the <span className='highlight'>server-side</span> before sending the order to the database.</>,
    <>At the moment <span className='highlight'>no payment method</span> has been implemented yet. But after submitting an order, the order, with all necessary information, will be <span className='highlight'>inserted into the database</span> and <span className='highlight'>subtracted from the inventory</span>. Finally, no images are included with the mock data from the database. The full code, including the SQL data for creating the database, can be found at <span className='highlight'>github.com/mike-2432</span>.</>    
]