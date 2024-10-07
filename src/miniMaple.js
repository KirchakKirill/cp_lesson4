class MiniMaple {
    constructor() {
        this.regex = /[+-]?\d*\s*\*?\s*[a-z]\^?\d*/g;
        this.result_str = '';
    }

    diff(polynom, variable) {
        
        if (!this.isValidPolynomial(polynom)) {
            throw new Error('Invalid polynomial');
        }

        let polynom_array = polynom.match(this.regex);
        if (polynom_array){
        polynom_array.forEach(match => {
            let pref = '';
            let degree = '';
            let sign_pref = 1;
            let varName = '';

            
            match = match.replace(/\s+/g, '');

            
            if (match[0] === '-') {
                sign_pref = -1;
                match = match.slice(1); 
            } else if (match[0] === '+') {
                match = match.slice(1); 
            }

           
            const variableIndex = match.indexOf(`${variable}`)
            console.log(variableIndex)
            if (variableIndex !== -1) {
                const degreeIndex = match.indexOf('^', variableIndex);
                
                if (degreeIndex !== -1) {
                    degree = match.slice(degreeIndex + 1);
                    pref = match.slice(0, variableIndex);
                } else {
                    degree = '1'; 
                    pref = match.slice(0, variableIndex); 
                }
                let parsedPref = parseFloat(pref) || 1;
                let parsedDegree = parseInt(degree) || 0;
                let sign = sign_pref === 1 ?'+':'-'
                let parsed_mult = parsedPref * parsedDegree === 1?'':parsedPref * parsedDegree;
                if (parsedDegree > 0) {
                    if(this.result_str ==='') sign = ''
                    this.result_str += `${sign}${parsed_mult}${variable}^${parsedDegree - 1}`;
                }
            }
        });
    }
        
        if (this.result_str ==='')  this.result_str = '0'
        this.result_str = this.result_str.replaceAll('^1','')
        return this.result_str;
    }

    isValidPolynomial(polynom) {
        const validPattern = /^[+-]?(\d*\.?\d*\*?[a-z](\^\d+)?|\d+\.?\d*)(\s*[+-]\s*\d*\.?\d*\*?[a-z](\^\d+)?)*$/;
        return validPattern.test(polynom.replace(/\s+/g, ''));
    }
}
export {MiniMaple}

