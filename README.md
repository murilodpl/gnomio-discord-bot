- Create a EC2 INSTANCE
- Install Git and npm
```console
sudo yum install git -y
sudo yum install nodejs npm
```
- Clone the repo
- Install dependences
```console
sudo yum install python3 make gcc-c++
sudo yum install python3 make gcc-c++
npm intall
```




Connect via REMMINA
```
Server: O endereço IP público ou o DNS público da sua instância EC2.
Port: 22 (porta padrão do SSH).
User name: O nome de usuário apropriado para a AMI que você está usando (por exemplo, ec2-user para Amazon Linux, ubuntu para Ubuntu, etc.).
Password: Deixe em branco (você usará a chave privada para autenticação).
Private key: Clique no ícone de pasta ao lado deste campo e selecione o arquivo de chave privada (.pem) que você baixou quando criou a instância EC2.
```

Instalar FFmpeg
```
sudo yum install -y autoconf automake cmake freetype-devel gcc gcc-c++ git libtool make mercurial nasm pkgconfig zlib-devel

git clone https://github.com/FFmpeg/FFmpeg.git

cd FFmpeg
./configure --enable-shared
make
sudo make install

ffmpeg -version

possible error: https://web.archive.org/web/20141223015653/http://linuxserverguide.wordpress.com:80/2010/10/15/ffmpeg-error-while-loading-shared-libraries-libavdevice-so-52-cannot-open-shared-object-file/
```

Instalar PM2
```
sudo npm install -g pm2
pm2 start seu-arquivo.js
``` 
