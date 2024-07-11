import type NodeCG from '@nodecg/types';
import type { GeolocationReplicant } from '../types/schemas';

module.exports = function (nodecg: NodeCG.ServerAPI) {
	const exampleReplicant = nodecg.Replicant<GeolocationReplicant>("geolocationReplicant");
	setInterval(() => {
		if (exampleReplicant.value) {
			exampleReplicant.value.timestamp = Date.now();
		}
	}, 60000);

	const router = nodecg.Router();
	router.use(nodecg.util.authCheck);

	router.post("/position", (req, res) => {
		if (!Array.isArray(req.body.position) || req.body.position?.[0] == null || req.body.position?.[1] == null) {
			return res.sendStatus(400);
		}
		if (exampleReplicant.value) {
			exampleReplicant.value.position = [ Number(req.body.position[0]), Number(req.body.position[1]) ];
		}
		res.sendStatus(204);
	});

	router.post("/address", (req, res) => {
		if (exampleReplicant.value) {
			exampleReplicant.value.address = req.body.address ?? "";
		}
		res.sendStatus(204);
	});

	nodecg.mount("/geolocation-bundle", router);
};
