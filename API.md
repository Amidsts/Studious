                        APIs NEEDED FOR BOOK STORE

ADMIN { 
        signup,         sign in,        forgotPassword,         enterForgotPasswordCode,        resetPassword   changePasswordWhileOnline,      getAllSwots, getSwot,  getAuthors, getAuthor, addSalesRep,      getSalesRep, getBooks, getBook,  activateAuthor, suspendAuthor,    activateSalesRep, suspendSalesRep, activateSwot, suspendSwot
}

AUTHOR {
        signup,         sign in,        forgotPassword,         adminEditHisDetails,         enterForgotPasswordCode,        resetPassword   changePasswordWhileOnline, addBooks, addBulkBooks, getBooks, getBooks, getBooksByCategory,      editBooksDetails,      addBookImage,        getWallet,*         withdrawFromWalletToBankAccount*,
}

SWOT {
        signup,         sign in,        forgotPassword,         enterForgotPasswordCode,        resetPassword   changePasswordWhileOnline,      getBooks,        getBooks,      getBooksByCategory,      addBooksToCart,*      placeOrder,*
}

SALESrep {
        sign in,        forgotPassword,         enterForgotPasswordCode,        resetPassword   changePasswordWhileOnline
}