import './App.css';
import Router from './routes';
import ThemeConfig from './theme';
import ErrorHandler from './errorHandler';

function App() {
	return (
		<>
			<ThemeConfig>
				<ErrorHandler>
					<Router />
				</ErrorHandler>
			</ThemeConfig>
		</>
	);
}

export default App;
