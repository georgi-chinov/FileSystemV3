var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('./../db.js');

var _makeTree = function(options) {
    var children, e, id, o, pid, temp, _i, _len, _ref, temp, type, path;
    id = options.id || "id";
    pid = options.parentid || "parentid";
    children = options.children || "children";
    type = options.format || "format";
    path = options.path || "path";
    extention = options.extention || "extention";
    temp = {};
    o = [];
    _ref = options.q;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        e[children] = [];
        temp[e[id]] = e;
        e.data = {
            id: e.id,
            type: e.type,
            path: e.path,
            ext: e.extention
        };

        if (temp[e[pid]] != null) {
            temp[e[pid]][children].push(e);
        } else {
            o.push(e);
        }
    }
    return o;
};


router.get('/', function(req, res) {
    if (!req.session.isLogged) {
        res.sendStatus(401);
        return;
    }
    db.query('(SELECT id, parentid, name, path, format,extention FROM folders WHERE user = ?) UNION(SELECT  CONCAT("file",id) as fileID,parentid, name, path, format,extention FROM files WHERE user = ?)', [req.session.user, req.session.user],
        function(err, results, query) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            if (results) {

                var tree = _makeTree({
                    q: results
                });
            }
            res.send(tree)
        })
})
router.post('/', function(req, res) {
    //Checking if the old passs is correct and changing it
    if (req.body.oldPassword) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.session.user, req.body.oldPassword], function(err, results, query) {
            if (!err) {
                if (results.length) {
                    db.query('UPDATE users SET password = ? WHERE username = ?', [req.body.password, req.session.user], function(err, results, query) {
                        if (!err) {
                            res.send({
                                legit: true
                            })
                        }
                    })
                    return;
                }
                res.send({
                    legit: false
                })
            }
        })
    }

    //Adding folder names to DB
    if (req.body.name) {
        var folderInfo = {
            name: req.body.name,
            user: req.session.user,
            parentid: req.body.currentfolder
        }
        db.query('INSERT INTO folders SET ?', folderInfo, function(err, results, query) {
            if (err) {
                console.log(err);
            }
            if (!err) {
                db.query('(SELECT id, parentid, name, path, format,extention FROM folders WHERE user = ?) UNION(SELECT  CONCAT("file",id) as fileID,parentid, name, path, format,extention FROM files WHERE user = ?)', [req.session.user, req.session.user],
                    function(err, results, query) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        if (results) {

                            var tree = _makeTree({
                                q: results
                            });
                        }
                        res.send(tree)
                    })
            }
        });
    }
    //File stuff
    if (req.file) {
        console.log(req.file);
        // Renaming the uploaded file
        var smth = req.file.originalname.split('.');
        var ext = smth.pop()
        var filePath = './uploads/' + req.file.filename;
        fs.rename(filePath, filePath + '.' + ext)
            // Adding the files to the DB
        filenfo = {
            name: req.file.originalname,
            user: req.session.user,
            path: filePath + '.' + ext,
            parentid: req.body.parentidfile,
            extention: ext

        }
        db.query('INSERT INTO files SET ?', filenfo)
        db.query('(SELECT id, parentid, name, path, format,extention FROM folders WHERE user = ?) UNION(SELECT  CONCAT("file",id) as fileID,parentid, name, path, format,extention FROM files WHERE user = ?)', [req.session.user, req.session.user],
            function(err, results, query) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                var tree = _makeTree({
                    q: results
                });
                res.send(tree)
            })

    }
});

module.exports = router;
