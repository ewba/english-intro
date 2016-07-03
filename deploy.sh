#!/bin/bash

base=index0.html
target=index.html
critical=$(which critical 2>/dev/null || echo node_modules/.bin/critical)
[[ -x $critical ]] || exit 100

# join the javascript and append the extracted inline logic
cat js/jquery.js js/bootstrap.min.js js/jquery.easing.min.js js/cbpAnimatedHeader.min.js > js/crit.js
sed -n '/<script>/,/<\/script>/ { /^[^<]/p}' "$base" >> js/crit.js

# clear the loads
cp "$base" "$target"
sed -i '/<script src=.js/d' "$target"
sed -i '/<script>/,/<\/script>/d' "$target"

# load it
sed -i 's,</body>,<script src="js/crit.js" async></script>&, ' "$target"

# clear single lin comments
sed -i 's/<!--.*-->//' "$target"

# inline critical path css with the "critical" nodejs module
# in case something goes terribly wrong, just use the source html
if "$critical" -m -i < "$target" > "2$target"; then
  mv "2$target" "$target"
else
  cp "$base" "$target"
fi
