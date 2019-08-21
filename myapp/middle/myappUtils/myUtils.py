import random


def getValidCode():
    validCode = ''
    c = random.randint(0, 3)
    for i in range(4):
        if c == i:
            validCode += str(random.randint(0, 9))
        else:
            validCode += chr(random.randint(65, 90))
    return validCode
