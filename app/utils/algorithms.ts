export function encryptPassword(s: string) {    // shifter algorthims   shift is of 3
    let str = s.trim().toLowerCase();
    let finalstr = ""
  

    for (let i = 0; i < str.length; i++) {

        let rawcode=str.charCodeAt(i);
        

        if (rawcode >= 97 && rawcode <= 122 ){    // check to skip numbers  
       let  code = ((str.charCodeAt(i) - 97 + 3) % 26) + 97;   // shift cypher // if not modulo then switch can be used
        

         let codetochar = String.fromCharCode(code);
      
        finalstr += codetochar;
        }
        else{
            finalstr+=str[i]
        }


       

    }


    return finalstr
}

export function decryptPassword(s: string) {    // shifter algorthims   shift is of 3
    let str = s.trim().toLowerCase();
    let finalstr = ""
  

    for (let i = 0; i < str.length; i++) {

        let rawcode=str.charCodeAt(i);
         

        if (rawcode >= 97 && rawcode <= 122 ){    // check to skip numbers  
        let code = ((str.charCodeAt(i) - 97 - 3+26) % 26) + 97;   // shift cypher // if not modulo then switch can be used
       
         let codetochar = String.fromCharCode(code);
        
        finalstr += codetochar;
        }
        else{
            finalstr+=str[i]
        }


       

    }


    return finalstr
}

// basic idea , just getting the char code of number , increasing it by 3 (ignoring numbers) then converting the added code from code to chars and making final string from them . I know there is no use of it as if your reading , you can decrypt it , but , my mind was not at peace until this shit was implemented. 