'use server';

import { fetchCredentialById, fetchHolderCredsByPickupToken, fetchTemplateById } from "../data";
import { Credential } from "../definitions";
const exchangeHost = process.env.EXCHANGE_HOST
const timeToLive = 15552000000  // 15 minutes
const tenantName = 'test';
//const tenantAuthToken

export const getDeepLink =
    async ({ pickupToken, credId, shouldIncludeEmail }:
        { pickupToken: string, credId: string, shouldIncludeEmail: boolean, deliveryFormat: string }) => {
        try {
            const { credential, holder } = await fetchCredentialById(credId);
            const holderCreds = await fetchHolderCredsByPickupToken(pickupToken)
            const doesHolderOwnCred = holderCreds.some((cred:Credential)=>cred.id===credential.id)
            const credTemplate = await fetchTemplateById(credential.cred_template_id);
            const vc = credTemplate.template_json;
            vc.name = holder.name
            const dataToPost = {
                tenantName,
                "data": [
                    {
                        "retrievalId": "single",
                        timeToLive,
                        deleteWhenCollected: true,
                        vc
                    }
                ]
            }
            // deeplinks look like this:
            //https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=50991c0d-e033-49c4-86aa-7f3620cf6937&vc_request_url=https://issuer.dcconsortium.org/exchange/e63007bc-6065-417c-8ae8-6b8fbc6a79df/50991c0d-e033-49c4-86aa-7f3620cf6937
            const result = await postData(`${exchangeHost}/exchange/setup`, dataToPost)
            const deepLink = result[0].directDeepLink;
            return deepLink

    } catch (e) {

    }
}

async function postData(url = "", data = {}, tenantAuthToken: string = "notused") {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tenantAuthToken}`
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const deepLink = await response.json();
        console.log(deepLink);
        return deepLink;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error(`Error calling exchange coordinator: ${error}`);
    }

}


const vc = {
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
        "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "urn:uuid:19281fe8-90d2-4eao-a9da-6188898a6c",
    "type": [
        "VerifiableCredential",
        "OpenBadgeCredential"
    ],
    "issuer": {
        "type": [
            "Profile"
        ],
        "name": "The Learned",
        "image": {
            "id": "https://digitalcredentials.github.io/badge-assets/classroom.png",
            "type": "Image",
            "caption": "Learned logo"
        }
    },
    "validFrom": "2025-02-24T00:00:00Z",
    "name": "Parker Pearl",
    "credentialSubject": {
        "type": [
            "AchievementSubject"
        ],
        "achievement": {
            "id": "https://something.org/theProgram",

            "type": [
                "Achievement"
            ],
            "image": {
                "id": "https://digitalcredentials.github.io/badge-assets/brain.png",
                "type": "Image",
                "caption": "Certificate logo"
            },
            "criteria": {
                "narrative": "Objectively told the truth"
            },
            "description": "Successfully completed all modules.",
            "name": "Truth, veracity, candor, and verisimilitude."
        }
    }

}