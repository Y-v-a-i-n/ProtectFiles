const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
}),
gs = require("gradient-string")("#450057", "#BE00EE"),
aes256 = require("aes256"),
fs = require("fs"),
ascii = "\n    \n    ooooooooo.                          .                           .        oooooooooooo  o8o  oooo                     \n    `888   `Y88.                      .o8                         .o8        `888'     `8  `\"'  `888                     \n     888   .d88' oooo d8b  .ooooo.  .o888oo  .ooooo.   .ooooo.  .o888oo       888         oooo   888   .ooooo.   .oooo.o \n     888ooo88P'  `888\"\"8P d88' `88b   888   d88' `88b d88' `\"Y8   888         888oooo8    `888   888  d88' `88b d88(  \"8 \n     888          888     888   888   888   888ooo888 888         888         888    \"     888   888  888ooo888 `\"Y88b.  \n     888          888     888   888   888 . 888    .o 888   .o8   888 .       888          888   888  888    .o o.  )88b \n    o888o        d888b    `Y8bod8P'   \"888\" `Y8bod8P' `Y8bod8P'   \"888\"      o888o        o888o o888o `Y8bod8P' 8\"\"888P' \n",
resetConsole = message => {
    console.clear(), message ? console.log(gs(ascii + message)) : console.log(gs(ascii))
},
getFile = hihi => {
    let rotate2 = 0;
    setInterval((() => {
        0 == rotate2 && (resetConsole(), rl.question(gs("    what is the name of the file : "), (name => {
            fs.existsSync("./input/" + name) ? fs.readFile("./input/" + name, ((err, data) => {
                err ? (resetConsole("\n    An error has been occurred !"), setTimeout((() => rotate2 = 0), 2e3)) : rl.question(gs("    What is the key : "), (key => {
                    hihi(data, aes256.createCipher(String(key)), name)
                }))
            })) : (resetConsole("\n    The file cannot be found (please check that it is located in " + __dirname + "\\input\\)"), setTimeout((() => rotate2 = 0), 2e3))
        })), rotate2 = 1)
    }), 1e3)
};
let rotate1 = 0;
setInterval((() => {
0 == rotate1 && (resetConsole(), rl.question(gs("    do you want to encrypt or decrypt a file [e/d] : "), (EorD => {
    if (EorD.startsWith("e")) {
        let rotate3 = 0;
        setInterval((() => {
            0 == rotate3 && (getFile(((data, cipher, name) => {
                var encrypt = cipher.encrypt(data);
                fs.writeFile("./output/crypted_" + name, encrypt, (err => {
                    resetConsole(err ? "\n    An error has been occurred !" : "\n    The file has been encrypted !")
                }))
            })), rotate3 = 1)
        }), 1e3)
    } else if (EorD.startsWith("d")) {
        let rotate3 = 0;
        setInterval((() => {
            0 == rotate3 && (getFile(((data, cipher, name) => {
                var decrypt = cipher.decrypt(data);
                fs.writeFile("./output/decrypted_" + name.replace("crypted_", ""), decrypt, (err => {
                    resetConsole(err ? "\n    An error has been occurred !" : "\n    The file has been decrypted !")
                }))
            })), rotate3 = 1)
        }), 1e3)
    } else resetConsole('\n    Please choose between "d" and "e"'), setTimeout((() => rotate1 = 0), 2e3)
})), rotate1 = 1)
}), 1e3);