const express =require('express');
const router = express.Router();
const {handleGenerateNewShortURL,handleGetAnalytics} =require('../controllers/url')

router.post('/',handleGenerateNewShortURL);

router.get('/url/analytics/:shortId', handleGetAnalytics);


module.exports=router;