#!/bin/bash
apt install python3-pip -y

apt install python3-venv -y

python3 -m venv myenv

source myenv/bin/activate

pip3 install flask
