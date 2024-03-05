const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' });


const app = express();
app.engine('.hbs', hbs({ extname: '.hbs', layoutsDir: './layouts', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

// mildware

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/user', (req, res, next) => {
  res.render('login');
});

// endpoints

app.post('/contact/send-message', upload.single('file'), (req, res) => {

  const { author, sender, title, message} = req.body;
  const { file } = req;
  console.log(file);

  if(author && sender && title && message && file) {
    res.render('contact', { layout: 'dark', isSent: true, filename: file.originalname, file: file.filename});
  }
  else {
    res.render('contact', {layout: 'dark', isError: true });
  }
});

app.get('/', (req, res) => {
  // res.render('index', { layout: false });
  res.render('index', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
})

app.get('/about', (req, res) => {
  res.render('about');  
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'dark' });
});


app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
