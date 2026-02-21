export const sign =
    async ({ holderId, credId, shouldIncludeEmail, deliveryFormat }:
        { holderId: string, credId: string, shouldIncludeEmail: boolean, deliveryFormat: string }) => {
        try {
            const body = testVC
            const response =
                await fetch(`http://localhost:4006/instance/test/credentials/sign?suite=eddsa2022`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                    }
                )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new Error(`Error calling store: ${error}`);
        }
    }



const testVC = {
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