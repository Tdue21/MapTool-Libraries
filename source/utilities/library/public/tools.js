const defNs = "net.dovesoft.utilities";

class MT {

    static async evaluateMacro(macro) {
        try {
            let uri = "macro:EvaluateMacro@lib:" + defNs;
            let r = await fetch(uri, { method: "POST", body: macro });
            let result = await r.text();
            return result;

        } catch (error) {
            console.log("### evaluateMacro: " + error.stack);
        }
    }
}