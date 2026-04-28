@echo off
cd /d %~dp0
npm --prefix mobile run mobile:web:lan
