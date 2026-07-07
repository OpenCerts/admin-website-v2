import React, { FunctionComponent } from "react";

const MIGRATION_GUIDE_URL = "https://docs.opencerts.io/docs/migrations/oa_to_trustvc";

export const MigrationBanner: FunctionComponent = () => (
  <div
    className="w-full py-1 text-center font-bold"
    style={{ backgroundColor: "#ff9933", fontFamily: '"Source Sans Pro", sans-serif' }}
  >
    Please note that as of 1 October 2025, OpenAttestation (OA) has been deprecated. OpenCerts has since migrated to
    TrustVC, which uses the W3C Verifiable Credentials (VC) format.
    <br />
    Documents previously issued in OA format remain verifiable — no action is required for existing certificates.
    However, we recommend upgrading to the W3C VC format for all new issuances.
    <br />
    To migrate, please refer to our{" "}
    <a
      href={MIGRATION_GUIDE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="underline cursor-pointer"
      style={{ color: "#0000EE" }}
    >
      migration guide
    </a>
    .
  </div>
);
