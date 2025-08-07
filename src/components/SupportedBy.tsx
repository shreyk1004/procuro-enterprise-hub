import { Card, CardContent } from "@/components/ui/card";

export const SupportedBy = () => {
  return (
    <div className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Supported By
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Founders Inc Logo */}
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-4">
                <img 
                  src="/founders-inc-logo.png" 
                  alt="Founders Inc" 
                  className="h-16 md:h-20 object-contain"
                />
              </CardContent>
            </Card>

            {/* ElevenLabs Logo */}
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-4">
                <a 
                  href="https://elevenlabs.io/text-to-speech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="https://eleven-public-cdn.elevenlabs.io/payloadcms/pwsc4vchsqt-ElevenLabsGrants.webp" 
                    alt="ElevenLabs Text to Speech" 
                    className="h-12 md:h-16 object-contain"
                  />
                </a>
              </CardContent>
            </Card>

            {/* Penn Wharton Innovation Fund Logo */}
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">Penn</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">Wharton</div>
                  <div className="text-sm text-gray-600">Innovation Fund</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 