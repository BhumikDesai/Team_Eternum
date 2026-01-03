import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import {
  TreeDeciduous,
  Camera,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Globe,
  Leaf,
} from "lucide-react";

const Trees = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const myTrees = [
    {
      id: 1,
      location: "Central Park, New York",
      date: "2024-01-15",
      status: "permanent",
      points: 100,
    },
    {
      id: 2,
      location: "Green Valley, Mumbai",
      date: "2024-01-20",
      status: "pending",
      points: 50,
      daysLeft: 22,
    },
    {
      id: 3,
      location: "City Garden, London",
      date: "2024-01-25",
      status: "pending",
      points: 50,
      daysLeft: 27,
    },
  ];

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    console.log("Camera Image:", file);

    // 👉 yahan Firebase upload logic ayega
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TreeDeciduous className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Tree Plantation</h1>
            </div>
            <p className="text-muted-foreground">
              Plant trees and earn permanent green dots. 50 points per tree 🌱
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Section */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Upload New Tree
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Hidden Camera Input */}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    id="cameraInput"
                    className="hidden"
                    onChange={handleCameraCapture}
                  />

                  <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      Take a Photo
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      📸 Camera only – gallery uploads disabled
                    </p>

                    <Button
                      variant="eco"
                      onClick={() =>
                        document.getElementById("cameraInput")?.click()
                      }
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Open Camera
                    </Button>

                    {imageFile && (
                      <p className="mt-4 text-sm text-eco-lime">
                        ✅ Image captured successfully
                      </p>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-eco-lime/10 rounded-xl">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-eco-lime" />
                      Verification Rules
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Temporary green dot for 30 days</li>
                      <li>• Re-upload photo after 30 days</li>
                      <li>• Same GPS location required</li>
                      <li>• Verified → Permanent dot + bonus points</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* My Trees */}
              <Card variant="eco">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>My Planted Trees</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {myTrees.length} trees
                  </span>
                </CardHeader>

                <CardContent className="space-y-4">
                  {myTrees.map((tree) => (
                    <div
                      key={tree.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          tree.status === "permanent"
                            ? "bg-eco-lime/20"
                            : "bg-eco-orange/20"
                        }`}
                      >
                        {tree.status === "permanent" ? (
                          <CheckCircle2 className="text-eco-lime" />
                        ) : (
                          <Clock className="text-eco-orange" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {tree.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Planted on{" "}
                          {new Date(tree.date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right">
                        {tree.status === "permanent" ? (
                          <span className="text-eco-lime font-medium">
                            Verified
                          </span>
                        ) : (
                          <span className="text-eco-orange text-sm">
                            {tree.daysLeft} days left
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatCard
                title="Total Trees"
                value="3"
                subtitle="1 verified, 2 pending"
                icon={TreeDeciduous}
                color="primary"
              />
              <StatCard
                title="Points Earned"
                value="200"
                subtitle="From tree planting"
                icon={Leaf}
                color="lime"
              />
              <StatCard
                title="CO₂ Offset"
                value="48 kg"
                subtitle="Per year"
                icon={Globe}
                color="sky"
              />

              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="text-eco-orange" />
                    Important
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>📸 Camera only (no gallery)</p>
                  <p>📍 GPS auto-recorded</p>
                  <p>🕒 Timestamp embedded</p>
                  <p>✅ Same location re-check</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trees;
