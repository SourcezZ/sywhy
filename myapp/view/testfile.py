# -*- coding: utf-8 -*-
import time
import threading


def send_mail_wrapper(func):
    def wrapper(request, *args, **kwargs):
        def send():
            print("sending" + str(request) + '\n')
            time.sleep(2)
            print("sending over\n")

        # threading.Thread(target=send, args=(request,)).start()
        threading.Thread(target=send).start()
        return func(request, *args, **kwargs)

    return wrapper


@send_mail_wrapper
def add_story(request):
    print('start func\n')
    print('over func\n')


add_story('im request')