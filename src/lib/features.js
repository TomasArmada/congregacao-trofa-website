import {
    Handshake,
    Map
} from "lucide-react";

// As chaves têm de corresponder às colunas booleanas de profiles.
export const FEATURES = [
    {
        key: "can_access_ministry",
        title: "Serviço de campo",
        description: "Acede aos recursos e à organização do ministério.",
        icon: Handshake,
    },
    {
        key: "can_access_territories",
        title: "Territórios",
        description: "Acede à gestão e consulta de territórios.",
        icon: Map,
    }
];
