const Article = require('../models/article')

const articleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const allArticle = async (req, res) => {
    try {
        let query = {};

        // Check if search parameter exists in the request query
        if (req.query.search) {
            // Case-insensitive search for articles with titles containing the search keyword
            query = { title: { $regex: new RegExp(req.query.search, 'i') } };
        }

        const articles = await Article.find(query);

        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = {
    articleById,
    allArticle
}