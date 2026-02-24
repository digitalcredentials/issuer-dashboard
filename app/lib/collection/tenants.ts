let TENANT_LIST

export const getTenantList = () => {
    if (! TENANT_LIST) {
        try {
            const tenantEnvVars = Object.keys(process.env)
                .filter(key => key.startsWith('TENANT_TOKEN_'))
                .reduce((obj, key) => {
                    const tenantName = key.split('_').slice(2).join('_')
                    // @ts-expect-error
                    obj[tenantName] = process.env[key];
                    return obj;
                }, {});
            return tenantEnvVars;
        } catch (e) {
            console.log("couldn't retrieve tenant names from .env file. Make sure your .env is properly set.")
        }
    }
    return TENANT_LIST
}

export const getTenantToken = (tenantName: string) => {
    // @ts-expect-error
    return getTenantList()[tenantName.toUpperCase()]
}