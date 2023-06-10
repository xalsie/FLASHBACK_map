import { execSync } from 'child_process';
import moment from 'moment';
import http from 'http'; // Import du package natif de node pour créer un serveur
import app from './app.js'; // Import de l'index d'application

const PORT = process.env.PORT || 3000;

// Configuration du port
// app.set('port', PORT);

// Démarrer un serveur node basique avec la méthode createServer du package http
const server = http.createServer(app);

// Le serveur écoute le port
server.listen(PORT, () => {
	var git = getGitVersion();
	
	console.log('<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	console.log('#  FLASHBACK mapping v1.0.1');
	console.log(`#  URL Web listening at ${server.address().address}:${PORT}`);
	console.log('');
	console.log('#  Developed by    : 🐻｜LeGrizzly#0341');
	console.log(' _                _____          _               _');
	console.log('| |              / ____|        (_)             | |');
	console.log('| |        ___  | |  __   _ __   _   ____  ____ | |  _   _');
	console.log('| |       / _ \\ | | |_ | | \\__| | | |_  / |_  / | | | | | |');
	console.log('| |____  |  __/ | |__| | | |    | |  / /   / /  | | | |_| |');
	console.log('|______|  \\___|  \\_____| |_|    |_| /___| /___| |_|  \\__, |');
	console.log('                                                      __/ |');
	console.log('                                                     |___/');
	console.log(`~~~~~~~~~~~~~~~~~~~~~~~~_Update: ${git[0]} - ${git[1]}_~~-->`);
});

function getGitVersion() {
	const version = execSync('git log --pretty="%h" -n1 HEAD');
	const commitDate = moment(execSync('git log -n1 --pretty=%ci HEAD').toString(),'YYYY-MM-DD HH:mm:ss Z').format('DD-MM HH:mm');

	return [version.toString().trim(), commitDate];
}
