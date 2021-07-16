# 该镜像是基于 nginx:latest 镜像而构建的
FROM nginx
# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下
COPY dist/ /usr/share/nginx/html/
# 将nginx目录下的default.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY nginx/default.conf /etc/nginx/config.d/default.conf
