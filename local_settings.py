# rename to local_settings.py
DEBUG="TRUE"
SECRET_KEY="ENTER KEY HERE" # Django secret key

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/home/skors/python/refundcleveland/db.sqlite3',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
