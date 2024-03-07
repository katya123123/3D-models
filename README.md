# usage

Проект запускается как обычный Django проект. 

venv venv
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
python manage.py runserver

Все 3d модели хранятся в папке static/models. Чтобы добавить свою модель, её необходимо выгрузить в формате bin+gltf, назвать оба файла scene и поместить в папку с названием модели в папку static/models. 
Затем в файле templates/ingex.html в скрипт внизу файла заменить door3 на название созданной папки с новой моделью. Тогда модель отобразиться.
