const router = require('express').Router();
const db = require('../data/db.js');

// GET to /api/posts
router.get('/', (req, res) => {
    db.find(req.query)
      .then(posts => {
          res.status(200).json(posts);
      })
      .catch(() => res.status(500).json({ error: "The posts information could not be retrieved." }));
});

// GET to /api/posts/:id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
      .then(post => {
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    })
      .catch(() => res.status(500).json({ error: "The posts information could not be retrieved." }));
});

// GET to /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
      .then(post => {
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    })
      .catch(() => res.status(500).json({ error: "The comments information could not be retrieved." }));
});

// POST to /api/posts
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(req.body)
          .then(post => {
              res.status(201).json(post);
          })
          .catch(() => res.status(500).json({ error: "There was an error while saving the post to the database" }));
    }
});

// POST to /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
   db.findById(req.params.id)
    if (!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {
        db.findById(req.params.id)
            .then((post) => {
                if (post.length === 0) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                } else {
                    db.insertComment({ text: req.body.text, post_id: req.params.id })
                        .then(comment => {
                            res.status(201).json(comment);
                        })
                        .catch(() => res.status(500).json({ error: "There was an error while saving the comment to the database" }));
                }
        })
    }
});


module.exports = router;