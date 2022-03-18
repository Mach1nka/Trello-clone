import app from './app/app';
import CONFIG from './config';

app.listen(CONFIG.PORT, () => {
  console.log('Server has started!');
});
