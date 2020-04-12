rm -R docs
mkdir docs
cp -avr static/ docs/
mkdir docs/js/
cp -v script/* docs/js/
cp -avr fontello/* docs/
cp -avr build/* docs/