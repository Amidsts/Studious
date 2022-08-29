        BOOK STORE SCHEMA ARCHITECTURE / DATA MODELLING

    API --> create user profile API
    
    BOOKS {
        authorId,
        bookTitle,
        description,
        category,
        currency,
        price,
        discountPrice, 
        bookSwots: {
            type,
            ref,
        }[]         //array of people that have purchase the book
        status,
        bookImg,
        recommended,
        ratings,
        reviews,
        categoryType,
        couponCode,
        Invoice
    }

    ADMIN {
        firstName,
        lastName,
        phone?,
        email,
        status,
        adminId,
        password,
        lastLoggedIn,
        role,
    }

    AUTHOR{
        firstName,
        lastName,
        gender,
        email,
        status,
        aboutAuthor,
        address: {
            country,
            state,
            city,
            localGovt,
            postalCode,
        
        };
        booksPublished: {
            type,
            ref,
        }[],
        walletId
    }

    SALES_REP : {
        firstName,
        lastName,
        phone?,
        email,
        status,
        password,
        lastLoggedIn,
        openedAt, //time
        closedAt, //time
        openingDays,
        closingDays,
        storeAddress: {
            country,
            state,
            city,
            localGovt,
            postalCode,
        },
        commentsReceived,
        walletId
    }

    SWOT MODEL {
        name,
        email,
        password, 
        phone number,
        books purchased, //array of books
        referralLink,
        referredSwot: [ Ids ], // id of swots reffered
        referredBy,
        refarralcounts,
        referralBonus,
        commentsMade,
        status
    }
         
    CART MODEL{
        salesRepId, 
        swotId, 
        books: [ 
            {
                bookId,
                books_quantity,
                Price,
                #discountPrice
            }
        ],  //array of ordered books Id
        totalPrice, 

    }

    ORDER MODEL{
        cart id, 
        deliveryLocation, 
        delivery fee, 
        delivery phone number, 
        order date,
        cartItemsPrice,
        payment Mode, 
        transactionId, 
        orderStatus
    }
    
    TRANSACTION{
        transaction Date,
        transaction details,
        transactionStatus
    }

    DELIVERYMAN {

    }

    WALLET

    COMMENTS