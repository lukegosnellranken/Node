// Sets up Express and MySQL to create database and db assets by running sql when a web address is accessed
// CRUD functionality using only Express

const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'nodemysql'
});

//Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected');
});

const app = express();

// Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created');
    });
});

//Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created');
    });
});

//Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body:'THis is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post one added');
    });
});

//Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title: 'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post two added');
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched');
    });
});

//Select single post
app.get('/getposts/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched');
    });
});

//Update single post
app.get('/updateposts/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated');
    });
});

//Delete single post
app.get('/deleteposts/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});