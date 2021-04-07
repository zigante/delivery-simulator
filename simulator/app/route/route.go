package route

import (
	"bufio"
	"encoding/json"
	"errors"
	"os"
	"strconv"
	"strings"
)

type Route struct {
	ID        string     `json:"routeId"`
	ClientID  string     `json:"clientId"`
	Positions []Position `json:"position"`
}

type Position struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type PartialRoutePosition struct {
	ID       string    `json:"routeId"`
	ClientID string    `json:"clientId"`
	Position []float64 `json:"position"`
	Finish   bool      `json:"finished"`
}

func NewRoute() *Route {
	return &Route{}
}

func (route *Route) LoadPositions() error {
	if route.ID == "" {
		return errors.New("route id not informed")
	}

	file, err := os.Open("destinations/route" + route.ID + ".txt")
	if err != nil {
		return err
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		data := strings.Split(scanner.Text(), ",")
		latitude, err := strconv.ParseFloat(data[0], 64)
		if err != nil {
			return err
		}
		longitude, err := strconv.ParseFloat(data[0], 64)
		if err != nil {
			return err
		}

		route.Positions = append(route.Positions, Position{Latitude: latitude, Longitude: longitude})
	}

	return nil
}

func (route *Route) ExportJSONPositions() ([]string, error) {
	var partialRoute PartialRoutePosition
	var result []string
	total := len(route.Positions)

	for k, v := range route.Positions {
		partialRoute.ID = route.ID
		partialRoute.ClientID = route.ClientID
		partialRoute.Position = []float64{v.Latitude, v.Longitude}
		if total-1 == k {
			partialRoute.Finish = true
		}
		jsonResult, err := json.Marshal(partialRoute)
		if err != nil {
			return nil, err
		}

		result = append(result, string(jsonResult))
	}

	return result, nil
}
