class LoadBalancer {
  constructor(rewardsEndpoint, domainNames, trafficPercentages) {
    this.rewardsEndpoint = rewardsEndpoint;
    this.domainNames = domainNames;
    this.trafficPercentages = trafficPercentages;
  }

  determineServiceUrl(isGetRequest) {
    const randomValue = Math.random();
    const routeToMicroservice =
      randomValue < this.trafficPercentages.microservice;
    const baseUrl = routeToMicroservice
      ? this.domainNames.microservice
      : this.domainNames.monolith;
    const endpoint = isGetRequest ? '' : this.rewardsEndpoint;
    const serviceUrl = `${baseUrl}${endpoint}`;

    // Trace logs to show routing decisions
    console.log(
      `Routing ${
        isGetRequest ? 'GET' : 'POST'
      } rewards request to: ${serviceUrl} (${
        routeToMicroservice ? 'Microservice' : 'Monolith'
      })`
    );

    return serviceUrl;
  }
}

module.exports = LoadBalancer;
