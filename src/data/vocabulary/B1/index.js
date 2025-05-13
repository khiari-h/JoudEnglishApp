import { vocab as expression } from "./categories/01_expression.js";
import { vocab as relations_interpersonnelles } from "./categories/02_relations_interpersonnelles.js";
import { vocab as monde_du_travail } from "./categories/03_monde_du_travail.js";
import { vocab as habitation_style_de_vie } from "./categories/04_habitation_style_de_vie.js";
import { vocab as voyages_decouvertes_culturelles } from "./categories/05_voyages_decouvertes_culturelles.js";
import { vocab as alimentation_gastronomie } from "./categories/06_alimentation_gastronomie.js";
import { vocab as sante_bien_etre } from "./categories/07_sante_bien_etre.js";
import { vocab as consommation_tendances } from "./categories/08_consommation_tendances.js";
import { vocab as education_formation_continue } from "./categories/09_education_formation_continue.js";
import { vocab as medias_information } from "./categories/10_medias_information.js";
import { vocab as technologie_innovations } from "./categories/11_technologie_innovations.js";
import { vocab as environnement_enjeux_ecologiques } from "./categories/12_environnement_enjeux_ecologiques.js";
import { vocab as culture_arts } from "./categories/13_culture_arts.js";
import { vocab as sports_activites_physiques } from "./categories/14_sports_activites_physiques.js";
import { vocab as societe_questions_sociales } from "./categories/15_societe_questions_sociales.js";

export default {
  exercises: [
    expression,
    relations_interpersonnelles,
    monde_du_travail,
    habitation_style_de_vie,
    voyages_decouvertes_culturelles,
    alimentation_gastronomie,
    sante_bien_etre,
    consommation_tendances,
    education_formation_continue,
    medias_information,
    technologie_innovations,
    environnement_enjeux_ecologiques,
    culture_arts,
    sports_activites_physiques,
    societe_questions_sociales
  ],
};
