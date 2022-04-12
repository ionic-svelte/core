############################################################################
#
# This code was submited by Struan Mclean to the
# svelte-ionic-app github project
# it is free to use
#
############################################################################

# DO (python cli_tool.py --help) for commands

import os
import shutil
import sys

# If you do python cli_tool.py --init
# It will install everything and
# init the program

if sys.argv[1] == "--init":
    print("@svelte-ionic-app installing modules")
    print("")
    os.system("npm install @capacitor/core")
    os.system("npm install @capacitor/cli --save-dev")
    os.system("npm install @capacitor/ios")
    os.system("npm install @capacitor/android")
    os.system("npm install @capacitor-community/electron")
    os.system("npm uninstall -g ionic")
    os.system("npm install -g @ionic/cli")
    os.system("npx cap copy")
    os.system("npm install page")
    os.system("npx cap add android")
    os.system("npx cap add ios")
    os.system("npx cap add electron")
    os.system("npm install")
    os.system("rollup -c")

    try:
        os.system("cls")
    except:
        os.system("clear")

    os.system("npm run help")
    
# Runs your app in the browser
# add --build for Production

elif sys.argv[1] == "--web":
    print("@svelte-ionic-app starting web app")
    print("")
    os.system("rollup -c -w")
    
# Runs your app on android localy (DEBUG)
# add --build for Production

elif sys.argv[1] == "--android":
    print("@svelte-ionic-app starting android app")
    if sys.argv[2] == "--build":
        try:
            os.remove("android\\app\\src\\main\\assets\\capacitor.config.json")
        except:
            print("[info]: Config already gone")
    else:
        print("")
        os.system("npx cap copy")

    os.system("rollup -c")
    try:
        shutil.rmtree("android\\app\\src\\main\\assets\\public\\build")
    except:
        print("rmdir not needed")
    try:
        shutil.copytree("public\\build", "android\\app\\src\\main\\assets\\public\\build")
    except:
        print("folder already exsists")
    os.system("npx cap open android")

    if sys.argv[2] != "--build":
        os.system("rollup -c -w")
        
# Runs your app on ios localy (DEBUG)
# add --build for Production

elif sys.argv[1] == "--ios":
    print("@svelte-ionic-app starting ios app")
    if sys.argv[2] == "--build":
        try:
            os.remove("ios\\App\\App\\capacitor.config.json")
        except:
            print("[info]: Config already gone")
    else:
        print("")
        os.system("npx cap copy")

    os.system("rollup -c")
    try:
        shutil.rmtree("ios\\App\\App\\public\\build")
    except:
        print("rmdir not needed")
    try:
        shutil.copytree("public\\build", "ios\\App\\App\\public\\build")
    except:
        print("folder already exsists")

    os.system("npx cap open ios")

    if sys.argv[2] != "--build":
        os.system("rollup -c -w")
        
# Production

elif sys.argv[1] == "--desktop":
    print("@svelte-ionic-app starting desktop app")
    if sys.argv[2] == "--build":
        try:
            os.remove("electron\\capacitor.config.json")
        except:
            print("[info]: Config already gone")
    else:
        print("")
        os.system("npx cap copy")

    os.system("rollup -c")
    try:
        shutil.rmtree("ios\\App\\App\\public\\build")
    except:
        print("rmdir not needed")
    try:
        shutil.copytree("public\\build", "electron\\app\\build")
    except:
        print("folder already exsists")

    os.system("npx cap open electron")

    if sys.argv[2] != "--build":
        os.system("rollup -c -w")

elif sys.argv[1] == "--help":
    print("""
    @svelte-ionic-app npm run help

    # Welcome to svelte-ionic-app

    (Python 9 and higher required) (Node js required)

    A simple python script which configures and runs svelte code 
    on apple, android, electron, and web with capacitor.

    # DEVELOPMENT / PRODUCTION

    to run the project on the web (works localy and in production) =  python cli_tool.py --web

    # DEVELOPMENT

    to run the project on android (only works localy) = python cli_tool.py --android

    to run the project on ios (only works localy) =  python cli_tool.py --ios

    # PRODUCTION

    finalize and build your app for production (android) =  python cli_tool.py --android --build

    finalize and build your app for production (ios) =  python cli_tool.py --ios --build

    finalize and build your app for production (desktop) =   python cli_tool.py --desktop --build

""")

else:
    print("""
@svelte-ionic-app error

err >>> Not a command

do (python cli_tool.py --help) for commands
    """)
