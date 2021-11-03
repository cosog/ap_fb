@echo off
@echo 创建表格及初始化.....
sqlplus ap_fb/ap123#@orcl @createAndInitDB.sql>createAndInitDB.txt

@pause 