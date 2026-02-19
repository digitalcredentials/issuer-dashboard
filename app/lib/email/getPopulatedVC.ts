

export const lcwExperienceBadge = {
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json"
    ],
    "id": "urn:uuid:951b475e-b795-43bc-ba8f-a2d01efd2eb1",
    "type": [
        "VerifiableCredential",
        "OpenBadgeCredential"
    ],
    "issuer": {
        "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
        "type": ["Profile"],
        "name": "Digital Credentials Consortium",
        "url": "https://digitalcredentials.mit.edu/",
        "image": {
            "id": "https://github.com/user-attachments/assets/dec7ea33-912f-4fc8-af44-9d3f114bea0b",
            "type": "Image"
        }
    },
    "validFrom": "2020-02-26T00:00:00Z",
    "name": "LCW Experience Badge",
    "credentialSubject": {
        "name": "",
        "type": ["AchievementSubject"],
        "achievement": {
            "id": "urn:uuid:142e9fe0-d7cd-46f2-bcde-78e8d0acfaad",
            "type": ["Achievement"],
            "achievementType": "Badge",
            "criteria": {
              "narrative": "- Learner experienced the on-demand issuing of the [LCW Experience Badge](https://badging.dcconsortium.org/lcw-experience-badge).\n- Learned about [W3C Verifiable Credentials and Open Badges 3.0](https://blog.dcconsortium.org/explaining-verifiable-credentials-and-open-badges-3-0-34ae898b98b2)"
            },
            "image": {
              "id": "https://github.com/user-attachments/assets/3042a8c8-4835-4340-91b0-aa2cec3b2cf2",
              "type": "Image"
            },
            "description": "Learner has experienced claiming and accepting an Open Badge 3.0 in their Learner Credential Wallet Application.",
            "name": "LCW Experience Badge"
        }
    }
}

const getPopulatedVC = (recipientName: string) => {
  const vc = JSON.parse(JSON.stringify(lcwExperienceBadge))
  vc.credentialSubject.name = recipientName
  vc.validFrom = (new Date()).toISOString();
  return vc
}

export { getPopulatedVC };
