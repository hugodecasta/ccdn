# ccdn
CDN script/file sharing system

---

## basic access

The ccdn system is used as a server to serve files (mainly javascript files) according to a specific path and option.

example: 
`/my/path/described/in/the/config/file -> one_file.js (minified)`

## config

In order to open access to specific files, le ccdn system relie on a cdn_map json formated config file containing accessible url paths, static files paths and js minification option.

One example of a ccdn config file
``` json
{
  "my/path/described/in/the/config/file": {
    "path":"../true/path/to/the/file.js",
    "min":true
  },
  "another/path": {
    "path":"another/script.js",
    "min":false
  }
}
```

# execute

The execution of the ccdn server uses node and several parameters in order to run

`node <path/to/the/ccdn/system/dir> <port> <path/to/the/ccdn/config/file.json>`

execution example
  * `node ./ccdn 9001 ./config/ccdn_map.json`
  * `node ./ 8080 ../config/ccdn_map.json`
