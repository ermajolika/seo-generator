import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDescriptionGenerator() {
  const [productName, setProductName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("creativo");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateDescription = async () => {
    setLoading(true);
    setError("");
    setDescription("");

    const prompt = `Scrivi una descrizione SEO per un prodotto chiamato "${productName}". Usa queste keyword: ${keywords}. Caratteristiche: ${features}. Tono: ${tone}.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error("Errore nella generazione");

      const data = await response.json();
      setDescription(data.result);
    } catch (err) {
      setError("Si è verificato un errore. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Generatore Descrizioni Prodotto</h1>
      <Input placeholder="Nome del prodotto" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <Input placeholder="Keyword SEO (separate da virgole)" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      <Input placeholder="Caratteristiche principali" value={features} onChange={(e) => setFeatures(e.target.value)} />
      <Input placeholder="Tono (es. creativo, tecnico, minimal)" value={tone} onChange={(e) => setTone(e.target.value)} />
      <Button onClick={generateDescription} disabled={loading}>
        {loading ? "Generazione in corso..." : "Genera Descrizione"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {description && (
        <Card className="mt-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Descrizione Generata:</h2>
            <p>{description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}