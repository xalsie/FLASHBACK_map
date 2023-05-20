// import path from 'path'; // image
import dotenv from 'dotenv';
import express from 'express'; // Import de la dépendance express
import session from 'express-session';
import compression from 'compression';
// import bodyParser from 'body-parser';        // Import de la dépendance qui permet de capter les corps de requête
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Variable du port
// const PORT = normalizedPort(process.env.PORT || 3000)
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return compression.filter(req, res);
};
app.use(
	// Session
	session({
		secret: '001/10111001101000101111010010110100100110110101',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(
	// Compress all HTTP responses
	compression({
		filter: shouldCompress,
		threshold: 0,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Empêcher les requêtes en boucle avec rateLimit
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // Voici l’équivalent de 10 minutes
	max: 100, // Le client pourra donc faire 100 requêtes toutes les 10 minutes
});
//  Cette limite de 100 requêtes toutes les 10 minutes sera effective sur toutes les routes.
app.use(limiter);

// Import des routes
// import userRoutes from './routes/user';
// import saucesRoutes from './routes/sauces';
// import likeRoutes from './routes/like';

// CORS : Contourner le système de sécurité CORS qui bloque par défaut les appels HTTP entre serveurs !
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

// Middlewares
// app.use(bodyParser.json()) // Capter les corps de requêtes en JSON
// app.use('/images', express.static(path.join(__dirname, 'images'))) // Gestionnaire de routage

// Routes complètes
// app.use('/api/auth', userRoutes)
// app.use('/api/sauces', saucesRoutes)
// app.use('/api/sauces', likeRoutes)

export default app;
