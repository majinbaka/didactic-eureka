#!/usr/bin/env python3
"""Compatibility entry point for the raster atlas packer."""
import runpy
from pathlib import Path

runpy.run_path(str(Path(__file__).resolve().parents[4] / "scripts/build_character_atlas.py"), run_name="__main__")
