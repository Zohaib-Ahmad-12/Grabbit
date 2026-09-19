export function encryptPassword(s: string) {    // shifter algorthims   shift is of 3
    let str = s.trim().toLowerCase();
    let finalstr = ""
  

    for (let i = 0; i < str.length; i++) {

        let rawcode=str.charCodeAt(i);
        let code;

        if (rawcode >= 97 && rawcode <= 122 ){    // check to skip numbers  
         code = ((str.charCodeAt(i) - 97 + 3) % 26) + 97;   // shift cypher // if not modulo then switch can be used
        console.log(code)

         let codetochar = String.fromCharCode(code);
        console.log(codetochar)
        finalstr += codetochar;
        }
        else{
            finalstr+=str[i]
        }


       

    }


    return finalstr
}