#!/bin/bash
sudo bash
echo "INFO: About to start Shopizer"
systemctl restart nginx
systemctl restart mariadb.service
systemctl restart elasticsearch
cd /opt/ecommerce/shopizer/sm-shop
nohup mvn spring-boot:run >/dev/null 2>&1 &
#sleep 120s
echo "INFO: Started Shopizer"
